<?php
require_once __DIR__."/MedicalService.php";
require_once __DIR__."/Prescription.php";
require_once __DIR__."/Patient.php";

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity;
 */
class Visit
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    /**
     * @ORM\Column(type="integer")
     */
    private $totalCost;
    /**
     * @ORM\Column(length=4)
     */
    private $payMethod;
    /**
     * @ORM\Column(type="boolean")
     */
    private $paid;
    /**
     * @ORM\Column(type="datetime")
     */
    private $checkIn;
    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $checkOut;
    /**
     * @ORM\ManyToOne(targetEntity="Patient", inversedBy="visits")
     */
    private $byPatient;
    /**
     * @ORM\ManyToOne(targetEntity="MedicalService", inversedBy="visits")
     */
    private $requestedService;
    /**
     * @ORM\OneToOne(targetEntity="Prescription")
     */
    private $prescription;

    public function __construct()
    {
        $this->checkIn = new DateTime("now", new DateTimeZone("Asia/Ho_Chi_Minh"));
        $this->paid = false;
        $this->totalCost = 0;
    }

    /**
     * Get the value of byPatient
     */
    public function getByPatient()
    {
        return $this->byPatient;
    }

    /**
     * Set the value of byPatient
     *
     * @param int $byPatient
     * @return  self
     */
    public function setByPatient(int $byPatient)
    {
        $patientObj = $this->entityManager->find('Patient', $byPatient);
        $this->byPatient = $patientObj;

        return $this;
    }

    /**
     * Get the value of checkIn
     */
    public function getCheckIn()
    {
        return $this->checkIn->format('Y-m-d H:i:s');
    }

    /**
     * Set the value of checkIn
     *
     * @param string $checkIn
     * @return  self
     */
    public function setCheckIn(string $checkIn)
    {
        $this->checkIn = DateTime::createFromFormat("Y-m-d H:i:s", $checkIn);

        return $this;
    }

    /**
     * Get the value of checkOut
     */
    public function getCheckOut()
    {
        if ($this->checkOut)
            return $this->checkOut->format('Y-m-d H:i:s');
        return null;
    }

    /**
     * Set the value of checkOut
     *
     * @param string $checkOut
     * @return  self
     */
    public function setCheckOut(string $checkOut)
    {
        $this->checkOut = DateTime::createFromFormat("Y-m-d H:i:s", $checkOut);

        return $this;
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of paid
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set the value of paid
     *
     * @return  self
     */
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get the value of payMethod
     */
    public function getPayMethod()
    {
        return $this->payMethod;
    }

    /**
     * Set the value of payMethod
     *
     * @return  self
     */
    public function setPayMethod($payMethod)
    {
        $this->payMethod = $payMethod;

        return $this;
    }

    /**
     * Get the value of prescription
     */
    public function getPrescription()
    {
        return $this->prescription;
    }

    /**
     * Set the value of prescription
     *
     * @param int $prescription
     * @return  self
     */
    public function setPrescription(int $prescription)
    {
        $prescriptionObj = $this->entityManager->find('Prescription', $prescription);
        $this->setTotalCost($this->totalCost + $prescriptionObj->getTotalCost());
        $this->prescription = $prescriptionObj;

        return $this;
    }

    /**
     * Get the value of requestedService
     */
    public function getRequestedService()
    {
        return $this->requestedService;
    }

    /**
     * Set the value of requestedService
     *
     * @param int $requestedService
     * @return  self
     */
    public function setRequestedService(int $requestedService)
    {
        $serviceObj = $this->entityManager->find('MedicalService', $requestedService);
        $this->setTotalCost($this->totalCost + $serviceObj->getTotalCost());
        $this->requestedService = $serviceObj;

        return $this;
    }

    /**
     * Get the value of totalCost
     */
    public function getTotalCost()
    {
        return $this->totalCost;
    }

    /**
     * Set the value of totalCost
     *
     * @return  self
     */
    public function setTotalCost($totalCost)
    {
        $this->totalCost = $totalCost;

        return $this;
    }

    public function get() {
        $result = [
            "id" => $this->getId(),
            "prescriptionID" => 'no prescription yet',
            "totalCost" => $this->getPayMethod(),
            "paidStatus" => $this->getPaid(),
            "checkIn" => $this->getCheckIn(),
            "checkOut" => 'no check out yet',
            "ByPatient" => $this->getByPatient()->getId(),
            "requestedService" => 'no service requested yet'
        ];
        if ($this->getPrescription())
            $result["prescriptionID"] = $this->getPrescription()->getId();
        if ($this->getCheckOut())
            $result["checkOut"] = $this->getCheckOut();
        if ($this->getRequestedService())
            $result["requestedService"] = $this->getRequestedService()->getId();
        return $result;
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 2
            && array_key_exists("payMethod", $fields)
            && array_key_exists("byPatient", $fields)
            && $fields["payMethod"] !== ""
            && $fields["byPatient"] !== ""
        ) {
            return true;
        }
        return false;
    }
}