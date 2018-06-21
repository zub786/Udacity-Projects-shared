# How to run the code
Steps to run:


1. To enjoy this project you will have to log in on vagrant
2. After Login, change the present working directory by using this command [ "cd /vagrant/newssite" ]
3. After executing above mentioned command execute the newssite.py file to run reporting tool for this use this command [ "python newssite.py" ]
4. newsdata.sql that we will have to setup for using in this code so setting up the code on command prompt 
	
	Execute Command: psql -d news -f newsdata.sql
	Or for setting up in code just place newsdata.sql in present working directory where newssite.py file exist.