export default {
  async addNote(context, payload) {
    const userId = context.rootGetters.userId;
    const noteData = {
      userId: userId,
      title: payload.title,
      content: payload.content,
    };
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/notes.json`,
      {
        method: "POST",
        body: JSON.stringify(noteData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to send data!");
      throw error;
    }
    context.commit("addNote", noteData);
  },

  async loadNotes(context) {
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/notes.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || "failed to get data!");
      throw err;
    }

    const notes = [];

    for (const key in responseData) {
      const note = {
        id: key,
        title: responseData[key].title,
        content: responseData[key].content,
      };
      notes.push(note);
    }

    context.commit("loadNotes", notes);
  },

  async deleteNote(context, payload) {
    const userId = context.rootGetters.userId;
    const noteId = payload;
    console.log(noteId);
    const response = await fetch(
      `https://timing-app-7c35b-default-rtdb.firebaseio.com/${userId}/notes/${noteId}.json`,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    // console.log(response)
    if (!response.ok) {
      const err = new Error(responseData.message || "failed to delete data!");
      throw err;
    }
    context.commit("deleteNote", payload);
  },
};
