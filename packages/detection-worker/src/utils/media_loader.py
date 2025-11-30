import requests, cv2, os, tempfile

def download_media(url: str) -> str:
    # Check if it's a local file
    if url.startswith("file://"):
        local_path = url[7:]  # remove 'file://'
        if not os.path.exists(local_path):
            raise FileNotFoundError(f"Media file not found: {url}")
        return local_path

    # Otherwise, treat it as a URL
    response = requests.get(url, stream=True)
    response.raise_for_status()

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    for chunk in response.iter_content(chunk_size=8192):
        tmp.write(chunk)
    tmp.close()
    return tmp.name

def extract_frames(filepath: str, max_frames=10):
    frames = []
    cap = cv2.VideoCapture(filepath)

    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"[DEBUG] Total frames in video: {total}")  # <- log total frames
    step = max(total // max_frames, 1)

    for i in range(0, total, step):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if not ret:
            print(f"[DEBUG] Frame read failed at index {i}")  # <- log failure
            break
        frames.append(frame)

        if len(frames) >= max_frames:
            break

    cap.release()
    print(f"[DEBUG] Extracted {len(frames)} frames")  # <- log extracted frames
    return frames
