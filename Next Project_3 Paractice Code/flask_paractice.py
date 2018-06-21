from flask import Flask, render_template, url_for, request, redirect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

engine = create_engine('sqlite:///restaurantMenu.db')
Base.metadata.bind=engine
DBSession = sessionmaker(bind = engine)

app = Flask(__name__)

# @app.route('/')
# @app.route('/menu')
# def MenuItemsList():
	# items = session.query(MenuItem).all()
	# # output = ""
	# # for i in items:
		# # output += i.name
		# # output += "</br>" + i.price
		# # output += "</br>" + i.description
		# # output += "</br></br>"
	# return render_template('menu.html', items = items)
	
@app.route('/menubyrest/<int:restaurant_id>/', methods = ['GET'])
def MenuItemsListByRestaurant(restaurant_id):
	print(restaurant_id)
	session = DBSession()
	rest = session.query(Restaurant).filter_by(id = restaurant_id).one()
	items = session.query(MenuItem).filter_by(restaurant_id = restaurant_id).all()
	return render_template('menu.html', items = items, restaurant = rest)

# Task 1: Create route for newMenuItem function here
@app.route('/menuitem/new/<int:restaurant_id>/', methods = ['GET', 'POST'])
def newMenuItem(restaurant_id):
	if(request.method == 'POST'):
		session = DBSession()
		print(request.form['itemname'])
		item = MenuItem()
		item.name = request.form['itemname']
		item.restaurant_id = restaurant_id
		print(item.restaurant_id)
		session.add(item)
		session.commit()
		return redirect(url_for('MenuItemsListByRestaurant', restaurant_id = restaurant_id))
	else:
		return render_template('newMenuItem.html', restid = restaurant_id)
# Task 2: Create route for editMenuItem function here
@app.route('/menuitem/edit/<int:restaurant_id>/<int:menu_id>/', methods = ['GET', 'POST'])
def editMenuItem(restaurant_id, menu_id):
	session = DBSession()
	if(request.method == 'POST'):
		
		item = session.query(MenuItem).filter_by(id = menu_id).one()
		item.name = request.form['itemname']
		session.add(item)
		session.commit()
		return redirect(url_for('MenuItemsListByRestaurant', restaurant_id = restaurant_id))
	else:
		i = session.query(MenuItem).filter_by(id = menu_id).one()
		print(i.name)
		return render_template('editMenuItem.html', restid = restaurant_id, menu = i )
# Task 3: Create a route for deleteMenuItem function here

@app.route('/menuitem/delete/<int:restaurant_id>/<int:menu_id>/')
def deleteMenuItem(restaurant_id, menu_id):
    return "page to delete a menu item. Task 3 complete!"
if(__name__ == '__main__'):
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)
