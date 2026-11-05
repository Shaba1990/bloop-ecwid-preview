from playwright.sync_api import sync_playwright
import pathlib
d=pathlib.Path('.').resolve()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
  for n,vp,m in [('desktop',{'width':1440,'height':900},False),('mobile',{'width':390,'height':844},True)]:
    pg=b.new_page(viewport=vp,device_scale_factor=2 if m else 1,is_mobile=m)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    for page,tag in [('index.html','home'),('lido-creams.html','lido'),('product.html?id=D31','product')]:
      pg.goto((d/page.split('?')[0]).as_uri()+('?'+page.split('?')[1] if '?' in page else ''));pg.wait_for_timeout(2000)
      pg.screenshot(path=f'screenshots/{n}-{tag}-first.png')
      if tag!='product':pg.screenshot(path=f'screenshots/{n}-{tag}-full.png',full_page=True)
    print(n,errs)
