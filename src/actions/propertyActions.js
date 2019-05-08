import {
  CREATE_PROPERTY,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_FAILURE
} from "./index";

export function createProperty(data) {
  return{
    type: CREATE_PROPERTY, data
  }
}

export function createPropertySuccess() {
  return{
    type: CREATE_PROPERTY_SUCCESS
  }
}

export function createPropertyFailure() {
  return{
    type: CREATE_PROPERTY_FAILURE
  }
}
