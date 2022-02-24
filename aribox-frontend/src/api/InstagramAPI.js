import axios from 'axios';
import AuthApi from './AuthApi';
const nextDayValue = 86400000;

const accessToken = 'IGQVJWV0tsc1hxbVFZAMVAyU0s0eFZAhMHBVLUcwUml4d21oMlpCaV9uYTNWSko0OHBsRjEwcVBUb1NoUnVtZATJCRi1WUkJfVEtEOGktN3lrQUpXTUxraFprTEw2Yk1PcFlhQksxVEE3M01EZATh3U2ZAhSQZDZD';

export const getImages = async () => {
  let photos = [];
  let get = false;
  const dateNow = new Date().getTime();

  try {
    const response = await AuthApi.get('/getInstaPhotos');

    if (response.status === 200) {
      const { data } = response;

      if (dateNow - data.date >= nextDayValue || !Object.keys(data).length) {
        get = true;
        const res = await axios.get(`https://graph.instagram.com/me?fields=id,username,media&access_token=${accessToken}`);
        if (res?.status === 200) {
          let {media: {data = []}} = res?.data;
          for (const el of data.slice(0, 6)) {
            if (el?.id) {
              const newRes = await axios.get(`https://graph.instagram.com/${el.id}?fields=id,media_url,caption,permalink&access_token=${accessToken}`);
              if (newRes?.status === 200) {
                const {caption, id, media_url, permalink} = newRes.data;
                const newData = {caption, id, mediaUrl: media_url, permalink};
                if (Object.keys(newData)) {
                  photos.push(newData);
                }
              }
            }
          }
        }
      } else {
        photos = data.photos;
      }
    }
  } catch(e) {
    console.log(e);
  }

  if (get) {
    try {
      await AuthApi.post('/setInstaPhotos', { date: dateNow, photos });
    } catch(e) {
      console.log(e);
    }
  }


  console.log(photos);
  return photos;
};
