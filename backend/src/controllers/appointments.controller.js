import Appointments from "../models/Appointments.js";

export const getAppointments = async (req, res) => {
  const appointments = await Appointments.find();

  if (appointments) {
    res.json(appointments);
  } else {
    res.json({ mensaje: "No Appointments" });
  }
};

/*---------------------------------------*/

export const addAppointment = async (req, res) => {
  const newAppointment = new Appointments(req.body)
  const { start, title } = req.body

  const estaEnProducts = await Appointments.findOne({ start });  

  const noEstaVacio = start !== "" && title !== "";

  if (!estaEnProducts && noEstaVacio) {
    await newAppointment.save()

    res.status(200).json({
      mensaje: "Scheduled Date",
      title, start
    });
  } else {
    res.status(400).json({
      mensaje: "Scheduled Already Date",
    });
  }
}

/*---------------------------------------*/

export const deleteAppointment = async (req, res) => {
  const { id } = await req.params;

  try {
    await Appointments.deleteOne({ _id: id });
    res.json(`Appointment with id: ${id} was deleted`)
  } catch(err) {
    throw new err
  }
};

/*---------------------------------------*/

export const updateAppointment = async(req, res) => {
  const { id } = await req.params;
  const { title, start } = req.body;

  await Appointments.findByIdAndUpdate(id, { title, start })
  res.json({title, start})
}
