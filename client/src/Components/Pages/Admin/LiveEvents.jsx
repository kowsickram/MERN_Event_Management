import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid
} from "@mui/material";

export default function LiveEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // To track the event being edited
  const [formData, setFormData] = useState({
    Event_name: "",
    Desc: "",
    Evnt_Type: "",
    Slot: 1
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/event/get_events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      Event_name: event.Event_name,
      Desc: event.Desc,
      Evnt_Type: event.Evnt_Type,
      Slot: event.Slot
    });
    setOpenEditDialog(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/event/update_event/${editingEvent._id}`, formData);
      fetchEvents(); // Refresh the events after update
      toast.success("Event updated successfully");
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/event/delete_event/${deleteEventId}`);
      fetchEvents(); // Refresh the events after deletion
      toast.success("Event deleted successfully");
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  const handleOpenDeleteDialog = (eventId) => {
    setOpenDeleteDialog(true);
    setDeleteEventId(eventId);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteEventId(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingEvent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer theme="light" position="bottom-right" />
      <h1 className="text-3xl text-center text-white font-bold p-2 mb-4 bg-slate-900">
        Events
      </h1>
      <div className="flex flex-wrap w-fit -mx-4">
        {events.map((event) => (
          <div key={event._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl text-center font-bold mb-2">{event.Event_name}</h2>
              <p className="text-gray-600 text-center p-2">{event.Evnt_Type}</p>
              <p className="text-black text-center p-2"> Slots {event.Slot}</p>
              <div className="flex space-x-4 justify-center mt-4">
                <Button variant="contained" color="primary" onClick={() => handleEdit(event)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleOpenDeleteDialog(event._id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Event Name" name="Event_name" value={formData.Event_name} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="Desc" value={formData.Desc} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Event Type" name="Evnt_Type" value={formData.Evnt_Type} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" label="Available Slots" name="Slot" value={formData.Slot} onChange={handleChange} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
