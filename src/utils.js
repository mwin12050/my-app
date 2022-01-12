const TOTAL_PAGES = 10;

export function checkIfUserExist(users, inputUser) {
  let check = false;
  if (!users) {
    return check;
  }
  users.every((user) => {
    if (inputUser.id === user.id) {
      check = true;
      return false;
    }
    return true;
  });
  return check;
}

export function removeUser(users, inputUser) {
  if (!users) {
    return [];
  }
  return users.filter((user) => {
    return user.id !== inputUser.id
  });
}

export function filterArrayByUsers(records, users) {
  if (users.length === 0) {
    return records;
  }
  let userIds = users.map((user) => {
    return user.id;
  });
  return records.filter((record) => {
    return userIds.includes(record.userId);
  });
}

export function filterArrayByTitle(records, title) {
  if (title === "" || title === null) {
    return records;
  }
  return records.filter((record) => {
    return record.title.includes(title);
  });
}

export function filterArrayByPage(records, page) {
  const start = (page * TOTAL_PAGES) - TOTAL_PAGES;
  const end = (page * TOTAL_PAGES);
  return records.slice(start, end)
}

export function getTotalPages(records) {
  return Math.ceil(records.length / TOTAL_PAGES)
}

export function formatAddress(address) {
  return address.suite + " " + address.street + ", " + address.city + ", " + address.zipcode;
}
