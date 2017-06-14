/**
 * 連携先スプレッドシートから課題追加に必要なデータを取得して
 * Backlogに課題を一括追加するスクリプト
 *
 */

// 課題を追加する
function addIssues(payload) {
  var spaceUrl = getSpaceUrl();
  var addUrl = getAddUrl();
  var apiKey = getApiKey();
  
  var requestUrl = spaceUrl + addUrl + "?apiKey=" + apiKey;
  
  /**
  var payloads = {
    "projectId" : 49389,
    "issueTypeId" : 1,
    "summary" : "APIからの課題追加だよ",
    "priorityId" : 3
  }
  */
  
  var options = {
    "method" : "post",
    "payload" : JSON.stringify(payload),
    "muteHttpExceptions" : true
  };
  
  var response = UrlFetchApp.fetch(requestUrl, options);

  return response;
}

// 連携先スプレッドシートから追加課題データの取得
function getSpreadSheetData() {
  /*
  var apiUrl = PropertiesService.getScriptProperties().getProperty('CONVERT_JSON_URL');
  var response = UrlFetchApp.fetch(apiUrl);
  
  Logger.log(response);
  return response;
  */
  
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadSheet.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();
  var keys = values.splice(0, 1)[0]; 
  
  var obj = {};
  var response;
  
  for(rows in values) {
    for(row in values[rows]) {
      obj[keys[row]] = values[rows][row];
    }
    response = addIssues(obj);
  }
  return response;
}

// バックログのスペースURLの取得
function getSpaceUrl() {
  return PropertiesService.getScriptProperties().getProperty('BACKLOG_SPACE_URL');
}

// APIキーの取得
function getApiKey() {
  return PropertiesService.getScriptProperties().getProperty('BACKLOG_API_KEY');
}

// リクエスト用パスの取得
function getAddUrl() {
  return PropertiesService.getScriptProperties().getProperty('BACKLOG_ADD_URL');
}

// メイン
function main() {
  var response = getSpreadSheetData();
  Logger.log(response);
}
