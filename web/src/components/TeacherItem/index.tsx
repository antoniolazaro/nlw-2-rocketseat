import React from 'react';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
    avatar: string;
    bio: string;
    name: string;
    cost: number;
    subject: string;
    user_id: number;
    id: number;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    return (
                <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt="Popete" />
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                    </header>
                    
                    <p>
                        {teacher.bio}
                    </p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ {teacher.cost}</strong>
                        </p>
                        <a href={`https://wa.me/${teacher.whatsapp}`}>
                            <img src={WhatsappIcon} alt="Entrar em contato" />
                            Entrar em contato
                        </a>
                    </footer>

                </article>
    );
}

export default TeacherItem;