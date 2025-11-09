from pydantic import BaseModel
from typing import List

#ride request schema.
class ride_request(BaseModel):
    user_id: str
    location: str
    name: str
    phone_no: int
    adress: str

    class Config:
        from_attributes = True

class show_request(BaseModel):
    user_id: str
    name: str
    phone_no: int
    adress: str
    location: str

    class Config:
        from_attributes = True

#schemas for showing list request
class showRequests(BaseModel):
    all_rides: List[show_request]

    class Config:
        from_attributes = True

class Location(BaseModel):
    location : str
    user_id : str

    class Config:
        from_attributes = True
#update location.
class updateLocation(BaseModel):
    location : str
    class Config:
        from_attributes = True

#Create User
class Create_user(BaseModel):
    name: str
    phone_no: int
    address: str
    user_id: str

    class Config:
        from_attributes = True

class gaurdian(BaseModel):
    name: str
    phone_no: int
    adress: str
    user_id: str

class value(BaseModel):
    value: int