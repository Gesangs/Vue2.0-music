scp -P 9548 /c/网页/bootstrap/Vue2.0-music/dist.zip dong@120.77.81.235:/home/dong/Music
ssh -p 9548 dong@120.77.81.235
cd Music
rm -rf dist
unzip dist.zip
pm2 restart app
pm2 restart Vuemusic

echo "success"