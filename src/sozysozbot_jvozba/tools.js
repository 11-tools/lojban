/* 
	create_every_possibility([[1,11], [2], [3,33,333]]) ==> [ [1,2,3],[11,2,3],  [1,2,33],[11,2,33],  [1,2,333],[11,2,333] ]
	create_every_possibility([[1,11]]) ==> [ [1],[11] ]
*/
function create_every_possibility(aa) {
  const arr_arr = JSON.parse(JSON.stringify(aa));
  if (arr_arr.length === 0) {
    return [[]];
  }
  const arr = arr_arr.pop();

  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];

    result = result.concat(
      create_every_possibility(arr_arr).map(f => {
        return f.concat([e]);
      })
    );
  }
  return result;
}

function gismu_rafsi_list$(a) {
  if (gismu_rafsi_list[a]) {
    return gismu_rafsi_list[a];
  }
  if (this.exp_rafsi) {
    return gismu_rafsi_list_exp[a];
  }
}

function cmavo_rafsi_list$(a) {
  if (cmavo_rafsi_list[a]) {
    return cmavo_rafsi_list[a];
  }
  if (this.exp_rafsi) {
    return cmavo_rafsi_list_exp[a];
  }
}

// get_candid("bloti", false) ==> ["lot", "blo", "lo'i", "blot"]
// get_candid("gismu", true) ==> ["gim", "gi'u", "gismu", "gism"]
function get_candid(selrafsi, isLast) {
  if (cmavo_rafsi_list$(selrafsi)) {
    return cmavo_rafsi_list$(selrafsi);
  } else if (gismu_rafsi_list$(selrafsi)) {
    const gismu = selrafsi;
    const candid = gismu_rafsi_list$(gismu).concat([]);

    if (isLast) {
      candid.push(gismu);
    }

    const chopped = gismu.slice(0, -1);
    if (chopped !== "brod") candid.push(chopped);

    return candid;
  } else {
    return [];
  }
}

function search_selrafsi_from_rafsi2(rafsi) {
  if (gismu_rafsi_list$(rafsi)) return rafsi; // 5-letter rafsi

  /* 
		I spent 45 minutes trying to find out whether "brod" can be a rafsi for "brodV", but couldn't find that out.
		Thus, for the present I forbid the use of "brod" as a rafsi.
	*/
  if (rafsi !== "brod" && rafsi.length === 4 && !rafsi.includes("'")) {
    //4-letter rafsi
    for (let u = 0; u < 5; u++) {
      const gismu_candid = rafsi + "aeiou".charAt(u);
      if (gismu_rafsi_list$(gismu_candid)) return gismu_candid;
    }
  }
  for (let i in gismu_rafsi_list) {
    if (gismu_rafsi_list[i].includes(rafsi)) return i;
  }
  for (let j in cmavo_rafsi_list) {
    if (cmavo_rafsi_list[j].includes(rafsi)) return j;
  }
  if (this.exp_rafsi) {
    for (let i in gismu_rafsi_list_exp) {
      if (gismu_rafsi_list_exp[i].includes(rafsi)) return i;
    }
    for (let j in cmavo_rafsi_list_exp) {
      if (cmavo_rafsi_list_exp[j].includes(rafsi)) return j;
    }
  }
  return null;
}

function search_selrafsi_from_rafsi(rafsi) {
  const selrafsi = search_selrafsi_from_rafsi2(rafsi);
  if (selrafsi != null) {
    return selrafsi;
  } else {
    throw new Error(`no word for rafsi ${rafsi}`);
  }
}

module.exports = function() {
  this.get_candid = get_candid;
  this.create_every_possibility = create_every_possibility;
  this.search_selrafsi_from_rafsi2 = search_selrafsi_from_rafsi2;
};