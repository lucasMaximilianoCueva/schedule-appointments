import appointmentsRoutes from './routes/appointments.js'
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

//sett
app.set('port', process.env.PORT || 4000);

//middl
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rout
app.use('/api/appointments', appointmentsRoutes);

export default app;