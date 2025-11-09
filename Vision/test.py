from datetime import datetime
current_datetime = datetime.now()
formatted_date = current_datetime.strftime("%Y-%m-%d %H:%M:%S") # YYYY-MM-DD HH:MM:SS
print(formatted_date)