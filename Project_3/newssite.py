#!/usr/bin/env python3
import psycopg2
import itertools
from datetime import datetime

# Creating connection with database exsisting in
# newsdata.sql file present in present working directory
db = psycopg2.connect(database="news")
# Seting Cursor in Database
c = db.cursor()
# Executing SQL Query
FirstQuery = """SELECT title, count(*) AS views
       FROM log JOIN articles
       ON log.path = concat('/article/', articles.slug)
       GROUP BY title
       ORDER BY views desc
       LIMIT 3;
    """
c.execute(FirstQuery)
# Getting the result that above query returned in tabuler form
rows = c.fetchall()
print("""""\n\nQUESTION 1: What are the most 
popular three articles of all time ?\nAnswer:""""")
for item in rows:
    print("\n\tArticle: " + str(item[0]) + " | " + str(item[1]) + " Views")
SecondQuery = """SELECT count(*) AS views, auth.name
       FROM log JOIN articles
       ON log.path = concat('/article/', articles.slug)
	   JOIN authors as auth ON articles.author = auth.id
       GROUP BY auth.name
       ORDER BY views desc
       LIMIT 3;
    """
c.execute(SecondQuery)
# Getting the result that above query returned in tabuler form
rows = c.fetchall()
print("""\n\nQUESTION 2: Who are the most 
popular article authors of all time ?\nAnswer:""")
for item in rows:
    print("\n\tAuthor: " + item[1] + " | " + str(item[0]) + " Views")	
print("""\n\nQUESTION 3:On which days did more than 1%
of requests lead to errors ?\nAnswer:""")
FourthQuery = """SELECT distinct failures.fc, failures.date, successes.sc FROM (SELECT count(*) AS fc, time::timestamp::date
    AS date FROM log
    WHERE status = '404 NOT FOUND'
    GROUP BY time::timestamp::date) AS failures,
	(SELECT count(*) AS sc FROM log
    WHERE status = '200 OK' 
    GROUP BY time::timestamp::date) AS successes
"""
c.execute(FourthQuery)
result = c.fetchall()
scount = 0
fcount = 0
tempDate = ""
for item in result:
	percentage = float(item[0] / float(item[0] + item[2])) * 100
	if(percentage > 1 and item[1] != tempDate):
		print("On Date: " + str(item[1]) + "  | " + str(round(percentage,3))+"% Errors")
	tempDate = item[1]
db.close()
