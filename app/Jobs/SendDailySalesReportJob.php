<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(OrderService $orderService): void
    {
        $reportData = $orderService->getTodaySalesReport();
        
        $admin = User::where('email', config('app.admin_email'))->first();
        
        if ($admin) {
            Mail::to($admin->email)->send(
                new DailySalesReport($reportData)
            );
        }
    }
}