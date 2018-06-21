import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
 
Base = declarative_base()
 
class Restaurant(Base):
    __tablename__ = 'restaurant'
   
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
 
class MenuItem(Base):
    __tablename__ = 'menu_item'

    name =Column(String(80), nullable = False)
    id = Column(Integer, primary_key = True)
    description = Column(String(250))
    price = Column(String(8))
    course = Column(String(250))
    restaurant_id = Column(Integer,ForeignKey('restaurant.id'))
    restaurant = relationship(Restaurant) 
class Bills(Base):
	__tablename__ = 'bills'
	id = Column(Integer, primary_key = True)
	CustomerName = Column(String(250), nullable = True)
	MenuItem_Id = Column(Integer, ForeignKey('menu_item.id'))
	menu_item = relationship(MenuItem)
 

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.create_all(engine)