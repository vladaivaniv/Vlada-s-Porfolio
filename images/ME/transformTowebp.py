import os
from PIL import Image

def convert_images_to_webp():
    # Get the directory where this script is located
    folder_path = os.path.dirname(os.path.abspath(__file__))
    folder_name = os.path.basename(folder_path)
    
    # Create a subfolder for converted images
    output_folder = os.path.join(folder_path, folder_name)
    os.makedirs(output_folder, exist_ok=True)
    
    # Get all files in the folder
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Filter for image files (add more extensions if needed)
    image_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff'))]
    
    # Loop through and convert each image
    for i, file_name in enumerate(image_files, start=1):
        file_path = os.path.join(folder_path, file_name)
        output_path = os.path.join(output_folder, f"{i}.webp")
        
        # Open image, convert to RGB, and save as WebP
        with Image.open(file_path) as img:
            img = img.convert("RGB")  # Ensure compatibility for non-RGB images
            img.save(output_path, format="webp")
        
        print(f"Converted {file_name} to {output_path}")

# Run the conversion function
convert_images_to_webp()
