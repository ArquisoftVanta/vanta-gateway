export const userTypeDef = `
	type User = {
		user_id = Int!
		name = String!
		doc = String!
		phone = String!
		mail = String!
		address = String!
		registerDate = String!
	}
	input registerInput = {
		name = String!
		doc = String!
		phone = String!
		mail = String!
		address = String!
	}
	input loginInput = {
		mail = String!
		password = String!
	}`;

export const userQueries =`
      userById(user_id: Int!): User!
  `;

export const userMutations = `
      registerUser(user: registerInput!): User!
      loginUser(user: loginInput!): String!
      updateUser(user: registerInput!): User! 
  `;
