const ConfigApi = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'b6137d5aa96b97a5db4c2c01b36c3e3c',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default ConfigApi;