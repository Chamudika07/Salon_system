from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True , index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False , unique=True , index=True)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)