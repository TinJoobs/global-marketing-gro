#!/usr/bin/env python3
"""Optional asset extraction from the user's supplied 1024 x 1536 concept.
Requires Pillow. The extracted assets are already included in the package.
Usage: python source/make_assets.py /path/to/GMG-concept.png
"""
from pathlib import Path
import argparse
from PIL import Image
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('concept',type=Path)
args=parser.parse_args()
im=Image.open(args.concept).convert('RGB')
if im.size!=(1024,1536):
 parser.error('Expected the supplied 1024 x 1536 concept image.')
root=Path(__file__).resolve().parent.parent/'website/assets/images'
root.mkdir(parents=True,exist_ok=True)
im.crop((680,95,1023,417)).save(root/'support-professional.webp',quality=94,method=6)
im.crop((782,1158,990,1300)).save(root/'collaboration.webp',quality=94,method=6)
mark=im.crop((47,14,111,77)).convert('RGBA')
pixels=mark.load()
for y in range(mark.height):
 for x in range(mark.width):
  r,g,b,a=pixels[x,y]
  if min(r,g,b)>240:pixels[x,y]=(r,g,b,0)
mark.save(root/'brand-mark.png')
print('Saved approved-concept crops to',root)
