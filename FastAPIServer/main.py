from fastapi import FastAPI,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import cv2
from paddleocr import PaddleOCR, draw_ocr
import layoutparser as lp
from paddleocr import PaddleOCR, draw_ocr
import tensorflow as tf
import numpy as np


app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def intersection(box_1,box_2):
  return [box_2[0],box_1[1],box_2[2],box_1[3]]

def iou(box_1,box_2):
  x_1 = max(box_1[0],box_2[0])
  y_1 = max(box_1[1],box_2[1])
  x_2 = max(box_1[2],box_2[2])
  y_2 = max(box_1[3],box_2[3])

  inter = abs(max((x_2 - x_1,0)) * max((y_2 - y_1),0))

  if inter == 0:
    return 0

  box_1_area = abs((box_1[2] - box_1[0]) * (box_1[3] - box_1[1]))
  box_2_area = abs((box_2[2] - box_2[0]) * (box_2[3] - box_2[1]))

  return inter / float(box_1_area + box_2_area - inter)


def convertToJSON(imageName):
    image = cv2.imread(imageName) # table.png
    image = image[..., ::-1]

    # load model
    model = lp.PaddleDetectionLayoutModel(config_path="lp://PubLayNet/ppyolov2_r50vd_dcn_365e_publaynet/config",
                                threshold=0.5,
                                label_map={0: "Text", 1: "Title", 2: "List", 3:"Table", 4:"Figure"},
                                enforce_cpu=True,
                                enable_mkldnn=True)
    # detect
    layout = model.detect(image)

    # show result
    # show_img = lp.draw_box(image, layout, box_width=3, show_element_type=True)
    # show_img.show()

    x_1 = 0
    x_2 = 0
    y_1 = 0
    y_2 = 0
    for l in layout:
        if l.type == 'Table':
            print(l.block)
            x_1 = int(l.block.x_1)
            x_2 = int(l.block.x_2)
            y_1 = int(l.block.y_1)
            y_2 = int(l.block.y_2)
            break

    print(x_1,x_2,y_1,y_2)


    im = cv2.imread(imageName) # table


    cv2.imwrite("new_table_croped.jpeg",im[y_1:y_2,x_1:x_2])


    ocr = PaddleOCR(lang='en')


    image_path = 'new_table_croped.jpeg'
    image_cv = cv2.imread(image_path)
    image_height = image_cv.shape[0]
    image_width = image_cv.shape[1]
    output = ocr.ocr(image_path)


    print(output)


    boxes = [line[0] for line in output[0]]
    texts = [line[1][0] for line in output[0]]
    probabilities = [line[1][1] for line in output[0]]



    for box in texts:
        print(box)


    image_boxes = image_cv.copy()

    for box,text in zip(boxes,texts):
        cv2.rectangle(image_boxes,(int(box[0][0]),int(box[0][1])),(int(box[2][0]),int(box[2][1])),(0,0,255),1)
        cv2.putText(image_boxes,text,(int(box[0][0]),int(box[0][1])),cv2.FONT_HERSHEY_SIMPLEX,1,(222,0,0),1)

    cv2.imwrite('detections.jpeg',image_boxes)


    im = image_cv.copy()


    horiz_boxes = []
    vert_boxes = []

    for box in boxes:
        x_h,x_v = 0,int(box[0][0])
        y_h,y_v = int(box[0][1]),0
        width_h,width_v = image_width,int(box[2][0] - box[0][0])
        height_h,height_v = int(box[2][1]-box[0][1]),image_height

        horiz_boxes.append([x_h,y_h,x_h+width_h,y_h+height_h])
        vert_boxes.append([x_v,y_v,x_v+width_v,y_v+height_v])

        cv2.rectangle(im,(x_h,y_h),(x_h+width_h,y_h+height_h),(255,0,0),1)
        cv2.rectangle(im,(x_v,y_v),(x_v+width_v,y_v+height_v),(0,255,0),1)



    print(boxes[0])


    cv2.imwrite('horiz_vert.jpeg',im)




    horiz_out = tf.image.non_max_suppression(
        horiz_boxes,
        probabilities,
        max_output_size = 1000,
        iou_threshold=0.1,
        score_threshold=float('-inf'),
        name=None
    )



    horiz_lines = np.sort(np.array(horiz_out))
    print(horiz_lines)



    im_nms = image_cv.copy()

    for val in horiz_lines:
        cv2.rectangle(im_nms,(int(horiz_boxes[val][0]),int(horiz_boxes[val][1])),(int(horiz_boxes[val][2]),int(horiz_boxes[val][3])),(0,0,255),1)



    vert_out = tf.image.non_max_suppression(
        vert_boxes,
        probabilities,
        max_output_size = 1000,
        iou_threshold=0.1,
        score_threshold=float('-inf'),
        name=None
    )


    vert_lines = np.sort(np.array(vert_out))

    # im_nms = image_cv.copy()

    for val in vert_lines:
        cv2.rectangle(im_nms,(int(vert_boxes[val][0]),int(vert_boxes[val][1])),(int(vert_boxes[val][2]),int(vert_boxes[val][3])),(0,255,0),1)


    cv2.imwrite('im_nms.jpeg',im_nms)

    ##
    ## convert to csv

    out_array = [["" for i in range(len(vert_lines))] for j in range(len(horiz_lines))]

    unordered_boxes = []

    for i in vert_lines:
        print(vert_boxes[i])
        unordered_boxes.append(vert_boxes[i][0])


    ordered_boxes = np.argsort(unordered_boxes)
    print(ordered_boxes)





    for b in range(len(texts)):
        # print(texts[b])
        colNum = b % len(vert_lines) 
        rowNum = int(b / len(vert_lines))
        print(rowNum,colNum)
        out_array[rowNum][colNum] = texts[b]



    out_arrayDF = pd.DataFrame(out_array)
    df2 = out_arrayDF.to_json(orient = 'records')


    print(df2)
    return out_arrayDF
"""
def convertToJSON():
    image = cv2.imread("newTable.jpeg") # table.png
    image = image[..., ::-1]

    # load model
    model = lp.PaddleDetectionLayoutModel(config_path="lp://PubLayNet/ppyolov2_r50vd_dcn_365e_publaynet/config",
                                    threshold=0.5,
                                    label_map={0: "Text", 1: "Title", 2: "List", 3:"Table", 4:"Figure"},
                                    enforce_cpu=True,
                                    enable_mkldnn=True)
    # detect
    layout = model.detect(image)

    # show result
    # show_img = lp.draw_box(image, layout, box_width=3, show_element_type=True)
    # show_img.show()

    x_1 = 0
    x_2 = 0
    y_1 = 0
    y_2 = 0
    for l in layout:
    if l.type == 'Table':
        print(l.block)
        x_1 = int(l.block.x_1)
        x_2 = int(l.block.x_2)
        y_1 = int(l.block.y_1)
        y_2 = int(l.block.y_2)
        break

    print(x_1,x_2,y_1,y_2)


    im = cv2.imread("newTable.jpeg") # table


    cv2.imwrite("new_table_croped.jpeg",im[y_1:y_2,x_1:x_2])


    ocr = PaddleOCR(lang='en')


    image_path = 'new_table_croped.jpeg'
    image_cv = cv2.imread(image_path)
    image_height = image_cv.shape[0]
    image_width = image_cv.shape[1]
    output = ocr.ocr(image_path)


    print(output)


    boxes = [line[0] for line in output[0]]
    texts = [line[1][0] for line in output[0]]
    probabilities = [line[1][1] for line in output[0]]



    for box in texts:
    print(box)


    image_boxes = image_cv.copy()

    for box,text in zip(boxes,texts):
    cv2.rectangle(image_boxes,(int(box[0][0]),int(box[0][1])),(int(box[2][0]),int(box[2][1])),(0,0,255),1)
    cv2.putText(image_boxes,text,(int(box[0][0]),int(box[0][1])),cv2.FONT_HERSHEY_SIMPLEX,1,(222,0,0),1)

    cv2.imwrite('detections.jpeg',image_boxes)


    im = image_cv.copy()


    horiz_boxes = []
    vert_boxes = []

    for box in boxes:
    x_h,x_v = 0,int(box[0][0])
    y_h,y_v = int(box[0][1]),0
    width_h,width_v = image_width,int(box[2][0] - box[0][0])
    height_h,height_v = int(box[2][1]-box[0][1]),image_height

    horiz_boxes.append([x_h,y_h,x_h+width_h,y_h+height_h])
    vert_boxes.append([x_v,y_v,x_v+width_v,y_v+height_v])

    cv2.rectangle(im,(x_h,y_h),(x_h+width_h,y_h+height_h),(255,0,0),1)
    cv2.rectangle(im,(x_v,y_v),(x_v+width_v,y_v+height_v),(0,255,0),1)



    print(boxes[0])


    cv2.imwrite('horiz_vert.jpeg',im)




    horiz_out = tf.image.non_max_suppression(
        horiz_boxes,
        probabilities,
        max_output_size = 1000,
        iou_threshold=0.1,
        score_threshold=float('-inf'),
        name=None
    )



    horiz_lines = np.sort(np.array(horiz_out))
    print(horiz_lines)



    im_nms = image_cv.copy()

    for val in horiz_lines:
    cv2.rectangle(im_nms,(int(horiz_boxes[val][0]),int(horiz_boxes[val][1])),(int(horiz_boxes[val][2]),int(horiz_boxes[val][3])),(0,0,255),1)



    vert_out = tf.image.non_max_suppression(
        vert_boxes,
        probabilities,
        max_output_size = 1000,
        iou_threshold=0.1,
        score_threshold=float('-inf'),
        name=None
    )


    vert_lines = np.sort(np.array(vert_out))

    # im_nms = image_cv.copy()

    for val in vert_lines:
    cv2.rectangle(im_nms,(int(vert_boxes[val][0]),int(vert_boxes[val][1])),(int(vert_boxes[val][2]),int(vert_boxes[val][3])),(0,255,0),1)


    cv2.imwrite('im_nms.jpeg',im_nms)

    ##
    ## convert to csv

    out_array = [["" for i in range(len(vert_lines))] for j in range(len(horiz_lines))]

    unordered_boxes = []

    for i in vert_lines:
    print(vert_boxes[i])
    unordered_boxes.append(vert_boxes[i][0])


    ordered_boxes = np.argsort(unordered_boxes)
    print(ordered_boxes)





    for b in range(len(texts)):
    # print(texts[b])
    colNum = b % len(vert_lines) 
    rowNum = int(b / len(vert_lines))
    print(rowNum,colNum)
    out_array[rowNum][colNum] = texts[b]
    # print(row)
    # for j in range(len(vert_lines)):
        # resultant = intersection(horiz_boxes[horiz_lines[i]],vert_boxes[vert_lines[ordered_boxes[j]]])

    # for b in range(len(boxes)):
    #   the_box = [boxes[b][0][0],boxes[b][0][1],boxes[b][2][0],boxes[b][2][1]]

    #   print(iou(resultant,the_box))
    #   if iou(resultant,the_box)> 1:
    #     out_array[i][j] = texts[b]
        # print(texts[b])
        # print(resultant)
    print(out_array)



    out_arrayDF = pd.DataFrame(out_array)
    df2 = out_arrayDF.to_json(orient = 'records')


    print(df2)
    return df2
"""


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/upload")
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    return {"message": convertToJSON(file.filename)}