const remoteImgUriBase = 'http://technoverseweb.com/mobile/images/';

const GetBgImageUrl = (imgFileName) => {
  return { uri: remoteImgUriBase + imgFileName };
};

export default GetBgImageUrl
