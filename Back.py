import uvicorn
import cv2
import os
import base64
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()
FRAME_WIDTH = 640
FRAME_HEIGHT = 480

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

camera = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

fourcc = cv2.VideoWriter_fourcc(*"XVID")  # or (*"mp4v") for MP4
NAS_PATH = r"C:\Shreejit Gautam\Vms"  # Or any valid path
if not os.path.exists(NAS_PATH):
    try:
        os.makedirs(NAS_PATH, exist_ok=True)
    except OSError as e:
        print(f"Warning: Could not create NAS path. Error: {e}")

# OLD CODE (Unchanged)
video_writer = cv2.VideoWriter(
    "recorded_output.avi", fourcc, 20.0, (FRAME_WIDTH, FRAME_HEIGHT)
)

@app.get("/single_frame")
def single_frame():
    """
    Returns a single frame from the webcam as JPEG.
    """
    success, frame = camera.read()
    if not success:
        return {"error": "Camera not accessible"}
    if recording and video_writer_for_new_session is not None:
      video_writer_for_new_session.write(frame)

    # If you want to also write frames from single_frame to the writer, 
    # do so here if you prefer. E.g.:
    # if recording:
    #     video_writer_for_new_session.write(frame)

    ret, buffer = cv2.imencode(".jpg", frame)
    if not ret:
        return {"error": "Failed to encode frame"}

    return {
        "base64_image": base64.b64encode(buffer.tobytes()).decode('utf-8')
    }

@app.post("/save_frames")
async def save_frames(request: Request):
    """
    [Unchanged] Saves snapshots to NAS
    """
    data = await request.json()
    images = data.get("images", [])

    saved_files = []
    for idx, img_str in enumerate(images):
        # img_str might be "data:image/jpeg;base64,...."
        # Remove the "data:image/xxx;base64," prefix if present
        if "," in img_str:
            img_str = img_str.split(",")[1]

        # Decode base64 to raw bytes
        img_bytes = base64.b64decode(img_str)

        # Convert raw bytes to OpenCV image
        # We can write bytes directly to disk, or do further OpenCV processing
        filename = f"fail_frame_{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}_{idx}.jpg"
        file_path = os.path.join(NAS_PATH, filename)

        try:
            with open(file_path, "wb") as f:
                f.write(img_bytes)
            saved_files.append(file_path)
        except Exception as e:
            return {"error": f"Failed to save image {idx}: {str(e)}"}


    # ... (same as your original code)
    return {"status": "ok", "saved_files": saved_files}

@app.get("/detect_face")
def detect_face():
    """
    Captures one frame, checks face, also writes frame to the old 'video_writer'
    """
    success, frame = camera.read()
    if not success:
        return {"face_found": False}

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6)

    # Old code: record to the old 'video_writer'
    video_writer.write(frame)

    return {"face_found": len(faces) > 0}

# NEW CODE: Additional global variables & endpoints
recording = False
video_writer_for_new_session = None

@app.post("/start_record")
def start_record():
    """
    Initialize a NEW video file to record, store it in the global 'video_writer_for_new_session'.
    """
    global recording, video_writer_for_new_session

    if not recording:
        # Build a unique filename
        file_name = f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}.avi"
        file_path = os.path.join(NAS_PATH, file_name)

        video_writer_for_new_session = cv2.VideoWriter(
            file_path, fourcc, 20.0, (FRAME_WIDTH, FRAME_HEIGHT)
        )
        recording = True
        print(f"Started new recording: {file_path}")
    return {"status": "started"}

@app.post("/stop_record")
def stop_record():
    """
    Stop the NEW video_writer_for_new_session and finalize the video file.
    """
    global recording, video_writer_for_new_session

    if recording and video_writer_for_new_session is not None:
        video_writer_for_new_session.release()
        print("Stopped recording and saved file to NAS.")
        recording = False
    return {"status": "stopped"}

# If you want to record every fetched frame from /single_frame or /detect_face 
# *for the new session*, you can do:
#   if recording and video_writer_for_new_session is not None:
#       video_writer_for_new_session.write(frame)
# inside single_frame() or detect_face().
# Just ensure you do not delete the old code that writes to 'video_writer'.

@app.on_event("shutdown")
def shutdown_event():
    if camera.isOpened():
        camera.release()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
