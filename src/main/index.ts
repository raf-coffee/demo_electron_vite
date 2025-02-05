import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import connectDB from "./db";
import type { Partner } from "../../types";
import icon from "../../resources/icon.png?asset";

async function getPartners(): Promise<Partner[] | void> {
  try {
    const response = await global.dbclient.query(`SELECT T1.*,
      CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
      WHEN sum(T2.production_quantity) > 50000 THEN 10
      WHEN sum(T2.production_quantity) > 10000 THEN 5
      ELSE 0 
      END as discount
      from partners as T1
      LEFT JOIN sales as T2 on T1.id = T2.partner_id
      GROUP BY T1.id`);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
}

async function createPartner(_: Electron.IpcMainInvokeEvent, partner: Partner): Promise<void> {
  const { organization_type, name, ceo, email, phone, address, rating } = partner;
  try {
    await global.dbclient.query(
      `INSERT into partners (organization_type, name, ceo, email, phone, address, rating) values('${organization_type}', '${name}', '${ceo}', '${email}', '${phone}', '${address}', ${rating})`,
    );
    dialog.showMessageBox({ message: "Успех! Партнер создан" });
  } catch (error) {
    console.log(error);
    dialog.showErrorBox("Ошибка", "Партнер с таким именем ужe существует");
  }
}

async function updatePartner(_: Electron.IpcMainInvokeEvent, partner: Partner): Promise<void> {
  const { id, organization_type, name, ceo, email, phone, address, rating } = partner;
  try {
    await global.dbclient.query(`UPDATE partners
      SET name = '${name}', organization_type = '${organization_type}', ceo='${ceo}', email='${email}', phone='${phone}', address='${address}', rating='${rating}'
      WHERE partners.id = ${id}`);
    dialog.showMessageBox({ message: "Успех! Данные обновлены" });
  } catch (error) {
    console.log(error);
    dialog.showErrorBox("Ошибка", "Не удалось обновить данные");
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.electron");

  global.dbclient = await connectDB();

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle("getPartners", getPartners);
  ipcMain.handle("createPartner", createPartner);
  ipcMain.handle("updatePartner", updatePartner);

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
