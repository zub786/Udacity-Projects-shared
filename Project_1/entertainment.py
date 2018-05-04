import media
import fresh_tomatoes

toyStory = media.Movie(
    "Toy Story",
    "A story of a boy and his toy",
    "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
    "https://www.youtube.com/watch?v=KYz2wyBy3kc")
IpMan = media.Movie(
    "IP MEN",
    "A story of fighter",
    "https://upload.wikimedia.org/wikipedia/en/1/1c/IpMan2Poster.jpg",
    "https://www.youtube.com/watch?v=1AJxXQ7xojE")
avatar = media.Movie(
    "Avatar",
    "A story Avatar",
    "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
    "https://www.youtube.com/watch?v=5PSNL1qE6VY")
tansformer = media.Movie(
    "Transformer",
    "A story of a Transformer",
    "https://upload.wikimedia.org/wikipedia/en/6/66/Transformers07.jpg",
    "https://www.youtube.com/watch?v=6Vtf0MszgP8")

avengers = media.Movie(
    "Avengers",
    "A story of Evengers",
    "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
    "https://www.youtube.com/watch?v=gQrkvZeE3Uc")

fastInFurious = media.Movie(
    "Fast In Furious",
    "A story Cars Race",
    "https://upload.wikimedia.org/wikipedia/en/b/b8/Furious_7_poster.jpg",
    "https://www.youtube.com/watch?v=uisBaTkQAEs")
movies = [toyStory, avatar, IpMan, tansformer, avengers, fastInFurious]
fresh_tomatoes.open_movies_page(movies)
