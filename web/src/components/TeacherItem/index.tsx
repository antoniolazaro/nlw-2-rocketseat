import React from 'react';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem(){
    return (
                <article className="teacher-item">
                    <header>
                        <img src="https://avatars3.githubusercontent.com/u/696250?s=460&v=4" alt="Popete" />
                        <div>
                            <strong>Popete</strong>
                            <span>Química</span>
                        </div>
                    </header>
                    
                    <p>
                        Apaixonado por explodir coisas...
                        <br /><br />
                        Detoona Ralph
                    </p>
                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 80,00</strong>
                        </p>
                        <button type="button">
                            <img src={WhatsappIcon} alt="Entrar em contato" />
                            Entrar em contato
                        </button>
                    </footer>

                </article>
    );
}

export default TeacherItem;