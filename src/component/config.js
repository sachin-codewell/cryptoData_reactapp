export const CoinListURL = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=70&page=1&sparkline=false`;

export const SingleCoinURL = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoinsURL = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const RegisterURL = 'https://cryptodataauth.herokuapp.com/api/register';
export const LoginURL = 'https://cryptodataauth.herokuapp.com/api/login';  
export const ProfileURL = 'https://cryptodataauth.herokuapp.com/api/profile';

export const AddToFavoriteURL = 'https://cryptdatafavrt.herokuapp.com/api/addfavorite';
export const RemoveToFavoriteURL = 'https://cryptdatafavrt.herokuapp.com/api/removefavorite';
export const GetFavoriteURL = "https://cryptdatafavrt.herokuapp.com/api/getfavoritecoin";

