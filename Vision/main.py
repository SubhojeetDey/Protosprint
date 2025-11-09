from fastapi import FastAPI,Depends,Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas,models,requests,json
from datetime import datetime
from database import SessionLocal,engine

app = FastAPI()

# Allow Cross-Origin requests from the Next.js dev server (adjust origins for prod)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
async def test():
    return "API is working fine."
#Create operation for ride request.
@app.post('/rides/book_ride')
async def book_ride(request:schemas.ride_request,db:Session = Depends(get_db)):
    check_ride = db.query(models.ride_request).filter(models.ride_request.user_id == request.user_id).first()
    if not check_ride:
        new_ride_request = models.ride_request(
            user_id = request.user_id,
            name = request.name,
            phone_no = request.phone_no,
            adress = request.adress,
            location = request.location,
        )
        db.add(new_ride_request)
        db.commit()
        db.refresh(new_ride_request)
        return "Ride Booked."
    else:
        db.query(models.ride_request).filter(models.ride_request.user_id==request.user_id).delete()
        db.commit()
        return('Request Deleted.')

#Show all the requests.
@app.get('/rides/show_all')
async def show_all_requests(db: Session = Depends(get_db)):
    rides = db.query(models.ride_request).all()
    return rides

#live location sharing.
# @app.post('/location/live')
# async def live_locaton(request:schemas.Location,db: Session = Depends(get_db)):
#     location = models.Location(
#         location = request.location,
#         user_id = request.user_id,
#     )
#     db.add(location)
#     db.commit()
#     db.refresh(location)

#get live location.
@app.get('/location/show',response_model=schemas.Location)
async def location(id : str,db: Session = Depends(get_db)):
    return db.query(models.Location).filter(models.Location.user_id == id).first()

#update live location.
@app.put('/location/update')
async def location_update(request:schemas.updateLocation,user_id:str,db: Session = Depends(get_db)):
    db.query(models.Location).filter(models.Location.user_id == user_id).update({
        'location':request.location,
    })
    db.commit()
    return "Location updated."

#Create User.
@app.post('/create/user')
async def create_user(request:schemas.Create_user,db: Session = Depends(get_db)):
    new_user = models.User(
        name = request.name,
        mobile_no = request.phone_no,
        adress = request.address,
        user_id = request.user_id
    )
    location = models.Location(
        user_id = request.user_id,
        location = 'null',
    )
    db.add(location)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.refresh(location)
    return 'User Created.'

#create gaurdian
@app.post('/create/gaurdian')
async def create_gaurdian(request:schemas.gaurdian,db: Session=Depends(get_db)):
    gaurdian = models.gaurdian(
        name=request.name,
        user_id=request.user_id,
        mobile_no=request.phone_no,
        adress=request.adress,
    )
    db.add(gaurdian)
    db.commit()
    db.refresh(gaurdian)
    return 'Gaurdian created.'

#Ride fare calculator
def fare_calculator(distance):
    return float(distance*10.0)

#Get Ride Fare.
@app.get('/get/RideFare/{distance}')
async def money(distance:float):
    return {'Fare':fare_calculator(distance)}

@app.delete('/rides/deleteRequest/{id}')
async def delete_request(id:str,db:Session = Depends(get_db)):
    db.query(models.ride_request).filter(models.ride_request.user_id==id).delete()
    db.commit()
    return('Request Deleted.')

@app.post('/create/location/{id}')
async def create_location(id:int,db: Session = Depends(get_db)):
    check_user = db.query(models.Location).filter(models.Location.user_id == id).first()
    if not check_user:
        location = models.Location(
            user_id = id,
            location = 'null',
        )
        db.add(location)
        db.commit()
    else:
        return "Location model already created."
@app.get('/1/{id}')
async def send_location(id:str,db: Session = Depends(get_db)):
    location = db.query(models.Location).filter(models.Location.user_id == id).first()
    raw_data = location.location
    loc_data = raw_data.split(',')
    print(loc_data)
    current_datetime = datetime.now()
    formatted_date = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    api_key = "Y2hfl4kENakt"
    data = {
        "device_id": "GPS_TRACKER_001",
        "timestamp": [str(formatted_date)],
        "lat": [float(loc_data[0])],
        "long": [float(loc_data[1])],
        "battery": [85],
        "payload": [
        {
            "temperature": 25.6,
            "humidity": 65.2,
            "speed": 45.8
        }
        ]
    }
    headers = {"Authorization": api_key, "Content-Type": "application/json"}
        # {"apikey": api_key, "Content-Type": "application/json"},
        # {"X-Api-Key": api_key, "Content-Type": "application/json"},
        # {"Authorization": api_key, "Content-Type": "application/json"}
    try:
        req = requests.post('https://www.circuitdigest.cloud/geolinker',json=data,headers=headers)
    except:
        print("\nError.")
    return loc_data,req.text

@app.post('/submit/value/{id}')
async def valueSubmission(request:schemas.value,id:str,db:Session = Depends(get_db)):
    check_value = db.query(models.Value).filter(models.Value.user_id == id).first()
    if not check_value:
        value = models.Value(
            user_id = id,
            value =  request.value
        )
        db.add(value)
        db.commit()
        return "Created"
    else:
        return 'already created.'

@app.put('/value/get/{id}')
async def get_value(request:schemas.value,id:str,db:Session = Depends(get_db)):
    get_value = db.query(models.Value).filter(models.Value.user_id == id)
    get_value.update({
        'value': request.value
    })
    db.commit()
    return 'value updated.'

@app.get('/get/value/{id}')
async def get_value(id:str,db:Session = Depends(get_db)):
    return db.query(models.Value).filter(models.Value.user_id == id).first()
    