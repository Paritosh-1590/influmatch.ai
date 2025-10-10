from pydantic import BaseModel
from typing import Optional, List

class CompanyProfile(BaseModel):
    name: str
    description: str
    target_audience: Optional[str] = ""

class Influencer(BaseModel):
    id: str
    name: str
    avatarUrl: Optional[str] = None
    channelUrl: Optional[str] = None
    subscribers: Optional[int] = None
    description: Optional[str] = None
