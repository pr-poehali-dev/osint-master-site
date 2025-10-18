import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [vkUsername, setVkUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [phoneResult, setPhoneResult] = useState<any>(null);
  const [telegramResult, setTelegramResult] = useState<any>(null);
  const [vkResult, setVkResult] = useState<any>(null);
  const [nameResult, setNameResult] = useState<any>(null);
  const [photoResult, setPhotoResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const exportToJSON = (data: any, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Успешно", description: "Данные экспортированы в JSON" });
  };

  const exportToCSV = (data: any, filename: string) => {
    let csvContent = '';
    if (Array.isArray(data)) {
      if (data.length === 0) return;
      const headers = Object.keys(data[0]);
      csvContent = headers.join(',') + '\n';
      data.forEach(row => {
        csvContent += headers.map(h => `"${row[h] || ''}"`).join(',') + '\n';
      });
    } else {
      const headers = Object.keys(data);
      csvContent = headers.join(',') + '\n';
      csvContent += headers.map(h => `"${data[h] || ''}"`).join(',') + '\n';
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Успешно", description: "Данные экспортированы в CSV" });
  };

  const searchByPhone = async () => {
    if (!phoneNumber) {
      toast({ title: "Ошибка", description: "Введите номер телефона", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c52a58fb-0727-40a8-95a2-17973faaac0b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'phone', phone: phoneNumber })
      });
      const data = await response.json();
      setPhoneResult(data);
      toast({ title: "Успешно", description: "Информация найдена" });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выполнить поиск", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const searchByTelegram = async () => {
    if (!telegramUsername) {
      toast({ title: "Ошибка", description: "Введите username", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c52a58fb-0727-40a8-95a2-17973faaac0b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'telegram', username: telegramUsername })
      });
      const data = await response.json();
      setTelegramResult(data);
      toast({ title: "Успешно", description: "Профиль найден" });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выполнить поиск", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const searchByVk = async () => {
    if (!vkUsername) {
      toast({ title: "Ошибка", description: "Введите ID или username", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c52a58fb-0727-40a8-95a2-17973faaac0b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'vk', username: vkUsername })
      });
      const data = await response.json();
      setVkResult(data);
      toast({ title: "Успешно", description: "Профиль найден" });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выполнить поиск", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async () => {
    if (!firstName || !lastName) {
      toast({ title: "Ошибка", description: "Введите имя и фамилию", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c52a58fb-0727-40a8-95a2-17973faaac0b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'name', firstName, lastName })
      });
      const data = await response.json();
      setNameResult(data);
      toast({ title: "Успешно", description: `Найдено результатов: ${data.results?.length || 0}` });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выполнить поиск", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const searchByPhoto = async () => {
    if (!photoFile) {
      toast({ title: "Ошибка", description: "Загрузите фотографию", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c52a58fb-0727-40a8-95a2-17973faaac0b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'photo' })
      });
      const data = await response.json();
      setPhotoResult(data);
      toast({ title: "Успешно", description: "Совпадения найдены" });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выполнить поиск", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      

      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 pt-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-900/50 to-black border border-red-700/50 backdrop-blur">
                <Icon name="Shield" size={48} className="text-red-500" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 glowing-text font-orbitron leading-tight">
              OSINT MASTER
            </h1>
            <p className="text-gray-400 text-xl mb-2">Анонимный поиск информации</p>
            <p className="text-gray-600 text-sm mb-6">База данных: 43+ записей | Быстрый поиск | Экспорт данных</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-950/30 px-4 py-2">
                <Icon name="Shield" size={16} className="mr-2" />
                Анонимно
              </Badge>
              <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-950/30 px-4 py-2">
                <Icon name="Zap" size={16} className="mr-2" />
                Быстро
              </Badge>
              <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-950/30 px-4 py-2">
                <Icon name="Database" size={16} className="mr-2" />
                База данных
              </Badge>
              <Badge variant="outline" className="border-purple-500/50 text-purple-500 bg-purple-950/30 px-4 py-2">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Badge>
            </div>
          </div>
        </header>

        <Tabs defaultValue="phone" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 border border-red-900/50 p-1 rounded-xl backdrop-blur">
            <TabsTrigger value="phone" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:shadow-lg text-xs sm:text-sm rounded-lg transition-all">
              <Icon name="Phone" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Телефон</span>
            </TabsTrigger>
            <TabsTrigger value="telegram" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:shadow-lg text-xs sm:text-sm rounded-lg transition-all">
              <Icon name="Send" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Telegram</span>
            </TabsTrigger>
            <TabsTrigger value="vk" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:shadow-lg text-xs sm:text-sm rounded-lg transition-all">
              <Icon name="Users" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">VK</span>
            </TabsTrigger>
            <TabsTrigger value="name" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:shadow-lg text-xs sm:text-sm rounded-lg transition-all">
              <Icon name="User" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">ФИО</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:shadow-lg text-xs sm:text-sm rounded-lg transition-all">
              <Icon name="Image" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Фото</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/50 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Phone" size={24} />
                  Поиск по номеру телефона
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите номер для получения детальной информации
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="+7 (900) 123-45-67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-black/70 border-gray-700 focus:border-red-500 text-white placeholder:text-gray-500 shadow-inner"
                  />
                  <Button 
                    onClick={searchByPhone}
                    disabled={loading}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 min-w-[120px] shadow-lg"
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>

                {phoneResult && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                        <Icon name="UserCheck" size={20} />
                        Результаты поиска
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => exportToJSON(phoneResult, 'phone-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => exportToCSV(phoneResult, 'phone-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Номер:</span> {phoneResult.phone}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="User" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">ФИО:</span> {phoneResult.fullName}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Calendar" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Дата рождения:</span> {phoneResult.birthDate}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Cake" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Возраст:</span> {phoneResult.age} лет
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Регион:</span> {phoneResult.region}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Smartphone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Оператор:</span> {phoneResult.operator}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Users" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Родители:</span> {phoneResult.parents}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Home" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Адрес:</span> {phoneResult.address}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Mail" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Email:</span> {phoneResult.email}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Share2" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Социальные сети:</span> {phoneResult.socialMedia.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="telegram" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/50 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Send" size={24} />
                  Поиск по Telegram Username
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите username для поиска информации о профиле
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="@username"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                  <Button 
                    onClick={searchByTelegram}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 min-w-[120px]"
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>

                {telegramResult && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                        <Icon name="UserCheck" size={20} />
                        Профиль найден
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => exportToJSON(telegramResult, 'telegram-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => exportToCSV(telegramResult, 'telegram-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <Icon name="AtSign" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Username:</span> @{telegramResult.username}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="User" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Имя:</span> {telegramResult.fullName}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Телефон:</span> {telegramResult.phone}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Hash" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">User ID:</span> {telegramResult.userId}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="FileText" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Био:</span> {telegramResult.bio}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Users" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Группы:</span> {telegramResult.groups.join(", ")}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Clock" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Последняя активность:</span> {telegramResult.lastSeen}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vk" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/50 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Поиск по ВКонтакте
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите ID или username профиля ВК
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="id123456789 или username"
                    value={vkUsername}
                    onChange={(e) => setVkUsername(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                  <Button 
                    onClick={searchByVk}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 min-w-[120px]"
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>

                {vkResult && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                        <Icon name="UserCheck" size={20} />
                        Профиль найден
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => exportToJSON(vkResult, 'vk-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => exportToCSV(vkResult, 'vk-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-3 text-gray-300">
                      {vkResult.fullName && (
                        <div className="flex items-start gap-3">
                          <Icon name="User" size={18} className="text-red-500 mt-1" />
                          <div>
                            <span className="text-gray-500">ФИО:</span> {vkResult.fullName}
                          </div>
                        </div>
                      )}
                      {vkResult.vkId && (
                        <div className="flex items-start gap-3">
                          <Icon name="Hash" size={18} className="text-red-500 mt-1" />
                          <div>
                            <span className="text-gray-500">VK ID:</span> {vkResult.vkId}
                          </div>
                        </div>
                      )}
                      {vkResult.city && (
                        <div className="flex items-start gap-3">
                          <Icon name="MapPin" size={18} className="text-red-500 mt-1" />
                          <div>
                            <span className="text-gray-500">Город:</span> {vkResult.city}
                          </div>
                        </div>
                      )}
                      {vkResult.phone && (
                        <div className="flex items-start gap-3">
                          <Icon name="Phone" size={18} className="text-red-500 mt-1" />
                          <div>
                            <span className="text-gray-500">Телефон:</span> {vkResult.phone}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="name" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/50 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Поиск по ФИО
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите имя и фамилию для поиска
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                  <Input
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                </div>
                <Button 
                  onClick={searchByName}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 w-full"
                >
                  {loading ? (
                    <Icon name="Loader2" size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Icon name="Search" size={18} className="mr-2" />
                      Найти
                    </>
                  )}
                </Button>

                {nameResult && nameResult.results && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                        <Icon name="UserCheck" size={20} />
                        Найдено: {nameResult.results.length}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => exportToJSON(nameResult.results, 'name-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => exportToCSV(nameResult.results, 'name-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {nameResult.results.map((person: any, idx: number) => (
                        <div key={idx} className="p-4 bg-black/30 rounded border border-red-900/50">
                          <div className="grid gap-2 text-gray-300 text-sm">
                            {person.fullName && <div><span className="text-gray-500">ФИО:</span> {person.fullName}</div>}
                            {person.birthDate && <div><span className="text-gray-500">Дата рождения:</span> {person.birthDate}</div>}
                            {person.city && <div><span className="text-gray-500">Город:</span> {person.city}</div>}
                            {person.phone && <div><span className="text-gray-500">Телефон:</span> {person.phone}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photo" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-red-900/50 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Image" size={24} />
                  Поиск по фотографии
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Загрузите фото для распознавания лица и поиска совпадений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-upload"
                    className="hidden"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400 mb-2">
                      {photoFile ? photoFile.name : 'Нажмите для загрузки фотографии'}
                    </p>
                    <p className="text-xs text-gray-600">JPG, PNG, WEBP до 10MB</p>
                  </label>
                </div>
                <Button 
                  onClick={searchByPhoto}
                  disabled={loading || !photoFile}
                  className="bg-red-600 hover:bg-red-700 w-full"
                >
                  {loading ? (
                    <Icon name="Loader2" size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Icon name="Search" size={18} className="mr-2" />
                      Найти
                    </>
                  )}
                </Button>

                {photoResult && photoResult.matches && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                        <Icon name="UserCheck" size={20} />
                        Найдено совпадений: {photoResult.matches.length}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => exportToJSON(photoResult.matches, 'photo-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          JSON
                        </Button>
                        <Button
                          onClick={() => exportToCSV(photoResult.matches, 'photo-search')}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                        >
                          <Icon name="Download" size={14} className="mr-1" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {photoResult.matches.map((match: any, idx: number) => (
                        <div key={idx} className="p-4 bg-black/30 rounded border border-red-900/50">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-2xl font-bold text-red-500">{match.confidence}%</div>
                            <div className="text-sm text-gray-400">совпадение</div>
                          </div>
                          <div className="grid gap-2 text-gray-300 text-sm">
                            {match.fullName && <div><span className="text-gray-500">ФИО:</span> {match.fullName}</div>}
                            {match.source && <div><span className="text-gray-500">Источник:</span> {match.source}</div>}
                            {match.city && <div><span className="text-gray-500">Город:</span> {match.city}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-gray-500 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="HelpCircle" size={18} />
            <span>Помощь:</span>
            <a 
              href="https://t.me/osint_gromov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              @osint_gromov
            </a>
          </div>
          <p className="text-xs text-gray-600">OSINT MASTER © 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;