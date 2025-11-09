from sqlalchemy import Column,Integer,String,ForeignKey
from database import Base
from sqlalchemy.orm import relationship

# class login_details:
#     __tablename__ = 'login details'

#     id = Column(Integer,primary_key=True,index=True)
#     email = Column(String)
#     password = Column(String)
#     details = Column(String,ForeignKey("Users.user_id"))
#     user_details = relationship('User',back_populates='login_detail')


class User(Base):
    __tablename__ = 'Users'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String)
    mobile_no = Column(Integer)
    adress = Column(String)
    user_id = Column(String)


    #login_detail = relationship('login_details',back_populates='user_details')

class ride_request(Base):
    __tablename__ = 'Rides'

    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(String)
    name = Column(String)
    phone_no = Column(Integer)
    adress = Column(String)
    location = Column(String)

class Location(Base):
    __tablename__ = 'Location'

    id = Column(Integer,primary_key=True,index=True)
    location = Column(String)
    user_id = Column(String)

class gaurdian(Base):
    __tablename__ = 'Gaurdian'

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String)
    user_id = Column(String)
    password = Column(String)
    mobile_no = Column(Integer)
    adress = Column(String)

class ride_logs(Base):
    __tablename__ = 'Ride_logs'

    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(String)
    date = Column(String)
    fare = Column(Integer)
    destination = Column(String)
class Value(Base):
    __tablename__ = 'Currency Value'

    id = Column(Integer,primary_key=True ,index=True)
    user_id = Column(String)
    value = Column(Integer)