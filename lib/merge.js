var merge = function(original, append) {
  for (i in original) {
    if (!append[i]) continue;

    if (append[i].constructor == Object) {
      original[i] = merge(original[i], append[i]);
      continue;
    }

    original[i] = append[i];
  }

  return original;
};

module.exports = merge;
