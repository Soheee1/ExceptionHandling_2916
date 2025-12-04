// Soal Bonus
class LoginError_2916 extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError_2916 extends LoginError_2916 {
    constructor(message) {
        super(message);
    }
}

class AuthError_2916 extends LoginError_2916 {
    constructor(message) {
        super(message);
    }
}

class SystemError_2916 extends LoginError_2916 {
    constructor(message) {
        super(message);
    }
}


function validateInput_2916(username, password) {
    try {
        if (username == null || password == null) {
            throw new ValidationError_2916("Input tidak boleh null/undefined");
        }

        if (typeof username !== "string" || typeof password !== "string") {
            throw new ValidationError_2916("Username dan password harus berupa string");
        }

        if (username.trim() === "" || password.trim() === "") {
            throw new ValidationError_2916("Username/password tidak boleh kosong");
        }

        if (username.length < 4) {
            throw new ValidationError_2916("Username terlalu pendek (minimal 4 karakter)");
        }

        if (password.length < 6) {
            throw new ValidationError_2916("Password terlalu pendek (minimal 6 karakter)");
        }

        return true;

    } catch (err) {
        if (err instanceof ValidationError_2916) {
            throw err; 
        }
        throw new SystemError_2916("Unexpected error saat validasi input");
    }
}


const dummyUsers_2916 = {
    "budi": "secret123",
    "andi": "passwordku",
};


function loginUser_2916(username, password) {
    try {
        validateInput_2916(username, password);

        if (!dummyUsers_2916[username]) {
            throw new AuthError_2916("Username tidak terdaftar");
        }

        if (dummyUsers_2916[username] !== password) {
            throw new AuthError_2916("Password salah");
        }

        return true;

    } catch (err) {
        if (err instanceof ValidationError_2916) {
            throw err;
        }
        if (err instanceof AuthError_2916) {
            throw err;
        }

        throw new SystemError_2916("Terjadi error sistem yang tidak terduga");
    } finally {
        console.log("Proses login selesai (finally jalan)");
    }
}


const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

function askLogin_2916() {
    readline.question("Masukkan username: ", (u) => {
        readline.question("Masukkan password: ", (p) => {

            try {
                const success = loginUser_2916(u, p);

                if (success) {
                    console.log("Login berhasil → Selamat datang!");
                    readline.close();
                }

            } catch (err) {

                if (err instanceof ValidationError_2916) {
                    console.log("Error input:", err.message);
                } else if (err instanceof AuthError_2916) {
                    console.log(err.message);
                } else if (err instanceof SystemError_2916) {
                    console.log("System Error:", err.message);
                } else {
                    console.log("Error tidak dikenal:", err.message);
                }

                console.log("\nCoba lagi!\n");
                askLogin_2916(); 

            }
        });
    });
}

askLogin_2916(); 





//  Soal 2
class InvalidPostalCodeError_2916 extends Error {
    constructor(code) {
        super(`Kode pos ${code} tidak valid (harus 5 digit)`);
        this.code = code;
    }
}

class DriverNotFoundError_2916 extends Error {
    constructor(area) {
        super(`Tidak ada driver di area kode pos ${area}`);
        this.area = area;
    }
}

class DeliveryTracker_2916 {

    static ValiddatePostalCode_2916(code) {
        if (!/^\d{5}$/.test(code)) {
            throw new InvalidPostalCodeError_2916(code);
        }
    }

    static async assignDriver_2916(postalcode) {
        if (postalcode === "99999") {
            throw new DriverNotFoundError_2916(postalcode);
        }

        return {
            driver: "Mas Budi",
            eta: "15 menit"
        };
    }

    static async trackDelivery_2916(orderID, postalcode) {
        try {
            this.ValiddatePostalCode_2916(postalcode);

            const driverInfo = await this.assignDriver_2916(postalcode);

            return {
                orderId: orderID,
                driver: driverInfo,
                status: "Sedang diantar"
            };

        } catch (error) {
            throw error;

        } finally {
            console.log("Close tracking session");
        }
    }
}


(async () => {
    try {
        const result = await DeliveryTracker_2916.trackDelivery_2916("ORD123", "12345");
        console.log("Berhasil: {");
        console.log(`   orderId: '${result.orderId}',`);
        console.log(`   driver: { driver: '${result.driver.driver}' , eta: '${result.driver.eta}' },`);
        console.log(`   status: '${result.status}'`);
        console.log("}");
    } catch (err) {}

    try {
        await DeliveryTracker_2916.trackDelivery_2916("ORD123", "99999");
    } catch (err) {
        console.log("Tracking gagal:", err.message);
        console.log("Close tracking session");
        console.log("Driver tidak ada:", err.area);
    }

    try {
        await DeliveryTracker_2916.trackDelivery_2916("ORD123", "12abc");
    } catch (err) {
        console.log("Tracking gagal:", err.message);
        console.log("Close tracking session");
    }

    try {
        DeliveryTracker_2916.ValiddatePostalCode_2916("12abc");
    } catch (err) {
        console.log("Kode pos salah:", err.code);
        console.log("Close tracking session");
    }

    try {
        const result = await DeliveryTracker_2916.trackDelivery_2916("ORD123", "12345");
        console.log("Berhasil: {");
        console.log(`   orderId: '${result.orderId}',`);
        console.log(`   driver: { driver: '${result.driver.driver}' , eta: '${result.driver.eta}' },`);
        console.log(`   status: '${result.status}'`);
        console.log("}");
    } catch (err) {}

})();



// Soal 1
class MenuNotAvailableError_2916 extends Error {
    constructor(menuId, menuName) {
        super(`Nasi Goreng Spesial (ID: ${menuId})`);
        this.menuId = menuId;
        this.menuName = menuName;
    }
}

class InsufficientBalanceError_2916 extends Error {
    constructor(shortage) {
        super(`Saldo kurang Rp${shortage.toLocaleString("id-ID")}`);
        this.shortage = shortage;
    }
}

class OrderService_2916 {

    static validatePhone_2916(phone) {
        if (!/^08\d{3,}$/.test(phone)) {
            throw new Error(`Nomor ${phone} tidak valid`);
        }
    }

    static checkMenuAvailabelity_2916(menuID) {
        if (menuID === 999) {
            throw new MenuNotAvailableError_2916(menuID, "Nasi Goreng Spesial");
        }
    }

    static async processOrder_2916(menuID, qty, walletBalance, phone) {
        try {
            this.validatePhone_2916(phone);

            this.checkMenuAvailabelity_2916(menuID);

            const price = 25000;
            const total = qty * price;

            if (walletBalance < total) {
                const shortage = total - walletBalance;
                throw new InsufficientBalanceError_2916(shortage);
            }

            return {
                menuId: menuID,
                qty,
                total,
                status: "Pesanan berhasil!"
            };

        } catch (error) {
            throw error;
        } finally {
            console.log("Clear cart session");
        }
    }
}


(async () => {

    try {
        await OrderService_2916.processOrder_2916(303, 2, 100000, "08123");
    } catch (err) {
        console.log(`Menu/Validasi gagal: ${err.message}`);
    }

    try {
        await OrderService_2916.processOrder_2916(999, 1, 100000, "08123456789");
    } catch (err) {
        if (err instanceof MenuNotAvailableError_2916) {
            console.log(`Menu/Validasi gagal: ${err.menuName} (ID: ${err.menuId})`);
        }
    }

    try {
        await OrderService_2916.processOrder_2916(303, 3, 35000, "08123456789");
    } catch (err) {
        if (err instanceof InsufficientBalanceError_2916) {
            console.log(`Saldo kurang: ${err.message}`);
        }
    }

    try {
        const result = await OrderService_2916.processOrder_2916(303, 2, 100000, "08123456789");
        console.log("Sukses:", result);
    } catch (err) {
        console.log(err.message);
    }

})();
