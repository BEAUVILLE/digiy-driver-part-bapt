from pathlib import Path
p=Path('gestion.html')
s=p.read_text()
old="let{data,error}=await db.from('digiy_driver_master_trips').select('id,client_name,client_phone,pickup,destination,ride_day,ride_time,agreed_price,currency,source,note,status,created_at').eq('driver_id',driver.id).order('ride_day',{ascending:false}).order('ride_time',{ascending:false,nullsFirst:false});"
new="let{data,error}=await db.rpc('digiy_driver_master_list_trips_v1',{p_driver_id:driver.id});"
if 'digiy_driver_master_list_trips_v1' in s:
    print('RPC listing déjà présent')
elif old not in s:
    raise SystemExit('Ancre lecture carnet introuvable')
else:
    s=s.replace(old,new,1)
    p.write_text(s)
    print('Lecture carnet remplacée par RPC propriétaire')
