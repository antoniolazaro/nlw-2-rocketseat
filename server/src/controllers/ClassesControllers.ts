import {Request, Response} from 'express';
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";


interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController{

    async index(request: Request, response: Response){

        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }
        const timeInMinutes = convertHourToMinutes(filters.time as string);
        console.log(timeInMinutes);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('schedule.*')
            .from('schedule')
            .whereRaw('`schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`schedule`.`week_day` = ??',[Number(week_day)])  
            .whereRaw('`schedule`.`from` <= ??',[timeInMinutes])
            .whereRaw('`schedule`.`to` > ??',[timeInMinutes])  
        })
        .where('classes.subject','=',subject)
        .join('users','classes.user_id','=','users.id')
        .select(['classes.*','users.*']);

        return response.json(classes);
    
    }

async create(request: Request, response: Response){

    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();

    try{
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });
    
        const user_id = insertedUsersIds[0];
    
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        })
    
        const class_id = insertedClassesIds[0];
    
        const classSchedule = schedule.map( (scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
    
        await trx('schedule').insert(classSchedule);
    
        await trx.commit();

        return response.status(201).send();
    }catch(error){
        console.log(error);
        await trx.rollback();
        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })
    }
}
}