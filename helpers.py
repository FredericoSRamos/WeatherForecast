def dt_time(dt):
    return dt.split(' ')[1]

def dt_date(dt):
    split = dt.split('-')

    return f"{split[2]}/{split[1]}/{split[0]}"

def dt_full(dt):
    date_time_split = dt.split(' ')
    date_split = date_time_split[0].split('-')
    return f"{date_split[2]}/{date_split[1]}/{date_split[0]} - " + date_time_split[1]

def convert_time(time):
    info = time.split(' ')
    split_time = info[0].split(':')
    if time.endswith("AM"):
        return info[0]
    else:
        return str(int(split_time[0]) + 12) + ":" + split_time[1]