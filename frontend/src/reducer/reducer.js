import initialState from "../store/store";

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "UPDATE_KM_COUNTER":
      switch (action.value) {
        case "erase":
          if (newState.numOfKmUpdates <= 6) {
            newState.numOfKmUpdates -= 1;
            newState.kmToUpdate.unshift("");
            newState.kmToUpdate.pop();
            newState.isMileageCorrect = true;
          }
          break;
        case "*":
          newState.kmToUpdate = initialState.kmToUpdate;
          newState.numOfKmUpdates = initialState.numOfKmUpdates;
          newState.isMileageCorrect = initialState.isMileageCorrect;
          break;

        default:
          if (newState.numOfKmUpdates < 6) {
            newState.numOfKmUpdates += 1;
            action.value = parseInt(action.value);
            newState.kmToUpdate.push(action.value);
            newState.kmToUpdate.shift();
            newState.isMileageCorrect = true;
            break;
          }
      }

      return newState;

    case "FETCHING_USER_DATA":
      newState.user.id = action.value.id;
      newState.user.mail = action.value.mail;
      newState.user.token = action.value.token;
      return newState;

    case "UPDATE_MILEAGE":
      newState.user.carData.currentMileage = parseInt(
        newState.kmToUpdate.join("")
      );
      newState.user.carData.lastKmUpdate = action.value;
      return newState;

    case "INCORRECT_MILEAGE":
      newState.isMileageCorrect = false;
      return newState;

    case "CLEAN_STORE":
      newState.kmToUpdate = initialState.kmToUpdate;
      newState.numOfKmUpdates = initialState.numOfKmUpdates;
      newState.isMileageCorrect = initialState.isMileageCorrect;
      return newState;

    case "FETCHING_CAR_DATA":
      const data = action.data;
      let mileage = newState.user.carData.currentMileage;
      let date = newState.user.carData.lastKmUpdate;
      if (mileage === 0) {
        mileage = data.km;
      }
      if (date === "") {
        date = data.date.slice(0, 10);
      }

      return {
        ...newState,
        user: {
          carData: {
            id: data.id_exemplaire_voiture,
            lastKmUpdate: date,
            year: data.année,
            brand: data.marque,
            model: data.modele,
            enginePower: data.motorisation,
            horsePower: data.puissance,
            currentMileage: mileage
          }
        }
      };
    default:
      return newState;
  }
};

export default reducer;
