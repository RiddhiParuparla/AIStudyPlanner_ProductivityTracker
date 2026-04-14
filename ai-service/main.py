from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Task(BaseModel):
    title: str
    deadline: int   # days left
    difficulty: int # 1-5
    duration: int   # hours

class RequestData(BaseModel):
    tasks: List[Task]
    daily_hours: int

@app.post("/generate")
def generate_schedule(data: RequestData):
    tasks = sorted(data.tasks, key=lambda x: (x.deadline, -x.difficulty))
    
    schedule = []
    current_day = 1
    remaining_hours = data.daily_hours

    for task in tasks:
        if remaining_hours < task.duration:
            current_day += 1
            remaining_hours = data.daily_hours
        
        schedule.append({
            "task": task.title,
            "day": current_day,
            "hours": task.duration
        })

        remaining_hours -= task.duration

    return {"schedule": schedule}
