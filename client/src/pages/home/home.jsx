import {Navbar} from '../../components/navbar/navbar'
import {Section} from '../../components/section/section'
import {Draws} from '../../components/draws/draws'
import {Games} from '../../components/games/games'
import { Main } from '../../components/main/main'
import './home.css'



export  const Home = () => {
    return (
        <div>
            <Navbar />
            <section className="home__container">
                <Section title="The drawings" width="29%">
                    <Draws></Draws>
                </Section>
                <Section title="Draws!" width="40%">
                    <Main></Main>
                </Section>
                
                <Section title="Games" width="29%">
                    <Games></Games>
                </Section>


            </section>
        </div>
    )
};