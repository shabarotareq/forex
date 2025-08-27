from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.database import db
from passlib.hash import bcrypt

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user: User):
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    user_dict = user.dict()
    user_dict["password"] = bcrypt.hash(user.password)
    db.users.insert_one(user_dict)
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: User):
    db_user = db.users.find_one({"email": user.email})
    if not db_user or not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user": db_user["username"]}
