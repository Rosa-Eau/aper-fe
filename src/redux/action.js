export const updateImage = (imageData) => ({
    type: 'UPDATE_IMAGE',
    payload: imageData,
  });

  export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });

  export const saveData = (data) => ({
    type: 'SAVE_DATA',
    payload: data,
  });

  export const setSelectedRoutine = (routineType) => ({
    type: "SET_SELECTED_ROUTINE",
    payload: routineType,
  });
  
// export const SET_SIGNUP_SUCCESS = 'SET_SIGNUP_SUCCESS';

export const setSignupSuccess = (value) => ({
  type: "SET_SIGNUP_SUCCESS",
  payload: value,
});

export const updateEpisodeCount = (newCount) => ({
  type: 'UPDATE_EPISODE_COUNT',
  payload: newCount,
});

