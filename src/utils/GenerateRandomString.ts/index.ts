const GenerateRandomString = (length: number) => {
        /* ____ For generating random string for auth token ... */
        const lowercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // a-z
        const uppercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
        const numbers = Array.from({ length: 10 }, (_, i) => i.toString()); // 0-9

        const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '\\', '|', '`', '~'];

        const allChars = [...lowercase, ...uppercase, ...numbers, ...specialChars];

        let token = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            token += allChars[randomIndex];
        }

        return token;
    }

export default GenerateRandomString ;