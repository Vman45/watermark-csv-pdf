module.exports = {
    replaceAllNonAlpha(str) {
        return str.replace(/\.[^.$]+$/, '')
                  .replace(/[^a-z0-9]/gmi, '_')
                  .replace(/\s+/g, '_');
    },
    removeAccentsAndSpaces(str) {
        let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        let accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        str = str.split('');
        str.forEach((letter, index) => {
          let i = accents.indexOf(letter);
          if (i !== -1) {
            str[index] = accentsOut[i];
          }
        })
        return str.join('').replace(/ /g, '_');
    },
    makeId(length) {
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      charactersLength       = characters.length;

      let result = '';

      for (let i = 0; i < length; i++ )
         result += characters.charAt(Math.floor(Math.random() * charactersLength));

      return result;
   }
};