import webbrowser


class Movie:
    
    """This class has some attributes and methods to be used for a movie.

    Methods:

        def def show_trailer(self):(self):
    This method is used to open the trailer of the movie that we pass to it.

    Extended description of function.

    Parameters
    ----------
    arg1 : self
        self hold the attributes of the current object that we passed to the 
        show_trailer function, so that show_trailer function would able to get
        the URL of the movie from this object
    Attributes:
        title (str) : This attribute save the name/title of the movie.
        storyLine (str): This attribute save the story line of the movie.
        poster_image_url (str) : This attribute save the poster 
        image link/URL of the movie.
        trailer_youtube_url (str) : This attribute save the 
        video trailer link/URL of the movie.
    User Defined Class Variable:
        RATINGS (INT) : This class variable will save the rating of movie.
    """
    
    RATINGS = [1, 2, 3, 4, 5]
    
    def __init__(self, title, storyLine, poster, youtubeURL):
        self.title = title
        self.storyLine = storyLine
        self.poster_image_url = poster
        self.trailer_youtube_url = youtubeURL
        
    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
