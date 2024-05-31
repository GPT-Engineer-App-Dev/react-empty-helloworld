import { useState } from "react";
import { Box, Button, Container, Heading, Input, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: "" });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" my={4}>Events</Heading>
        <Box>
          <Heading as="h2" size="md">Add New Event</Heading>
          <Input placeholder="Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Input placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <Input placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          <Input placeholder="Venue ID" value={newEvent.venue_id} onChange={(e) => setNewEvent({ ...newEvent, venue_id: e.target.value })} />
          <Button onClick={handleAddEvent} colorScheme="teal" mt={2}>Add Event</Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Venue ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
                  ) : (
                    event.name
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                  ) : (
                    event.date
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                  ) : (
                    event.description
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })} />
                  ) : (
                    event.venue_id
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Button onClick={() => handleUpdateEvent(editingEvent)} colorScheme="teal" size="sm">Save</Button>
                  ) : (
                    <Button onClick={() => setEditingEvent(event)} colorScheme="teal" size="sm">Edit</Button>
                  )}
                  <Button onClick={() => handleDeleteEvent(event.id)} colorScheme="red" size="sm" ml={2}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Events;