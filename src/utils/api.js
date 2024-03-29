const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001" 
const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    
    return payload.data;

  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function listReservations(params, signal) {
  const url = new URL(`${BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  
  return await fetchJson(url, { headers, signal }, [])
}

export async function getReservation(reservation_id, signal){
  const url = `${BASE_URL}/reservations/${reservation_id}`
  return await fetchJson(url, { headers, signal }, [])
}

export async function createReservation(reservation, signal) {
  const url = `${BASE_URL}/reservations`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}

export async function updateReservation(reservation, reservation_id, signal) {
  const url = `${BASE_URL}/reservations/${reservation_id}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function listTables(signal) {
  const url = `${BASE_URL}/tables`
  return await fetchJson(url, { headers, signal }, [])
}
export async function getTable(table_id, signal){
const url = `${BASE_URL}/tables/${table_id}`
return await fetchJson(url, {headers, signal}, {})
}
export async function updateTable(table, table_id, signal){
  const url = `${BASE_URL}/tables/${table_id}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data: table}),
    signal
  }
  return await fetchJson(url, options, table)
}
export async function deleteTable(table_id, signal){
  const url = `${BASE_URL}/tables/${table_id}`
  const options = {
    method: "DELETE",
    headers,
    signal
  }
  return await fetchJson(url, options)
}
export async function createTable(table, signal) {
  const url = `${BASE_URL}/tables`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, table);
}


export async function updateSeat(reservation_id, table_id, signal) {
  const url = `${BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: { reservation_id } }),
    headers,
    signal
  };
  return await fetchJson(url, options);
}

export async function updateReservationStatus(status, reservation_id, signal) {
  const url = `${BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: status } }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function finishTableReservation(table_id, signal) {
  const url = `${BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    headers,
    body: JSON.stringify({ data: { table_id } }),
    signal,
  };
  return await fetchJson(url, options);
}


export async function listGuests(signal){
  const url = `${BASE_URL}/guests`
  return await fetchJson(url, { signal }, [])
}

export async function updateGuest(updatedGuest, guest_id, signal){
  const url = `${BASE_URL}/guests/${guest_id}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedGuest }),
    signal
  };
  return await fetchJson(url, options);
}

export async function createGuest(guest, signal){
  const url = `${BASE_URL}/guests`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: guest}),
    signal
  }
  return await fetchJson(url, options, guest)
}