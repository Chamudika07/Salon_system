from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, UserLogin, Token, UserOut
from app.crud.auth import create_user, authenticate_user
from app.core.security import create_access_token
from app.db.dependency import get_db
from app.crud.customer import create_customer
from app.schemas.customer import CustomerCreate

router = APIRouter()

#create user API
@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db, user)
    db.refresh(db_user)
    if getattr(db_user, "role", None) == "customer":
        customer_in = CustomerCreate(
            name=user.username,  # or get from registration form
            email=user.email,
            phone="",
            address=""
        )
        create_customer(db, customer_in)
    return db_user

#login user API 
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}